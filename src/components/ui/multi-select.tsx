"use client";

import React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from 'class-variance-authority';

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";


const categoryVariants = cva(
    'transition-all border inline-flex items-center text-sm pl-2 rounded-md',
    {
      variants: {
          variant: {
              default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
              primary: 'bg-primary border-primary text-primary-foreground hover:bg-primary/90',
              destructive: 'bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/90',
          },
          size: {
              sm: 'text-xs h-7',
              md: 'text-sm h-8',
              lg: 'text-base h-9',
              xl: 'text-lg h-10',
          },
          shape: {
              default: 'rounded-sm',
              rounded: 'rounded-full',
              square: 'rounded-none',
              pill: 'rounded-lg',
          },
          borderStyle: {
              default: 'border-solid',
              none: 'border-none',
          },
          textCase: {
              uppercase: 'uppercase',
              lowercase: 'lowercase',
              capitalize: 'capitalize',
          },
          interaction: {
              clickable: 'cursor-pointer hover:shadow-md',
              nonClickable: 'cursor-default',
          },
          animation: {
              none: '',
              fadeIn: 'animate-fadeIn',
              slideIn: 'animate-slideIn',
              bounce: 'animate-bounce',
          },
          textStyle: {
              normal: 'font-normal',
              bold: 'font-bold',
              italic: 'italic',
              underline: 'underline',
              lineThrough: 'line-through',
          },
      },
      defaultVariants: {
          variant: 'default',
          size: 'md',
          shape: 'default',
          borderStyle: 'default',
          textCase: 'capitalize',
          interaction: 'nonClickable',
          animation: 'fadeIn',
          textStyle: 'normal',
      },
    }
  );
  
  export enum Delimiter {
      Comma = ',',
      Enter = 'Enter',
      Space = ' '
  }
  export type Category = {
    value: string;
    label: string;
}
  

type SupportedValueType = Record<"value" | "label", string>;

type OmittedInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'>;

export interface CategoryInputProps extends OmittedInputProps, VariantProps<typeof categoryVariants> {
    placeholder?: string;
    selected: Category[];
    setSelected: React.Dispatch<React.SetStateAction<Category[]>>;
    selectables: SupportedValueType [];
    enableAutocomplete?: boolean;
    autocompleteOptions?: Category[];
    maxCategory?: number;
    minCategory?: number;
    readOnly?: boolean;
    disabled?: boolean;
    onCategoryAdd?: (category: string) => void;
    onCategoryRemove?: (category: string) => void;
    allowDuplicates?: boolean;
    validateCategory?: (category: string) => boolean;
    delimiter?: Delimiter;
    showCount?: boolean;
    placeholderWhenFull?: string;
    sortCategory?: boolean;
    delimiterList?: string[];
    truncate?: number;
    minLength?: number;
    maxLength?: number;
    value?: string | number | readonly string[] | Category[];
    autocompleteFilter?: (option: string) => boolean;
}

const MultiSelect = React.forwardRef<HTMLInputElement, CategoryInputProps>((props, ref) => {

  const { 
    placeholder, 
    selected, 
    setSelected, 
    variant,
    selectables,
    size, 
    shape,
    className, 
    enableAutocomplete, 
    autocompleteOptions,
    maxCategory,
    delimiter = Delimiter.Comma,
    onCategoryAdd,
    onCategoryRemove,
    allowDuplicates,
    showCount,
    validateCategory,
    placeholderWhenFull = 'Max tags reached',
    sortCategory,
    delimiterList,
    truncate,
    autocompleteFilter,
    borderStyle,
    textCase,
    interaction, 
    animation, 
    textStyle,
    minLength,
    maxLength,
} = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((selectable: SupportedValueType) => {
    setSelected(prev => prev.filter(s => s.value !== selectable.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const yetSelectable = selectables.filter(item => !selected.some(selectedItem => selectedItem.value === item.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((category) => {
            return (
              <Badge key={category.value} variant="secondary">
                {category.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(category);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(category)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select frameworks..."
            className={`bg-transparent outline-none placeholder:text-muted-foreground  ${className}`}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && yetSelectable.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto py-6">
              {yetSelectable.map((selectable) => {
                return (
                  <CommandItem
                    key={selectable.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                      setSelected([...selected, selectable])
                    }}
                    className={"cursor-pointer"}
                  >
                    {selectable.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
})


MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };