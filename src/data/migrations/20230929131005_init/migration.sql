-- CreateTable
CREATE TABLE "t_Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coverImage" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tags" VARCHAR(100)[],
    "authorId" TEXT NOT NULL,

    CONSTRAINT "t_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_User_Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "t_User_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "t_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,

    CONSTRAINT "t_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_Category_On_Post" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "t_Category_On_Post_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateIndex
CREATE INDEX "t_Post_authorId_idx" ON "t_Post"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "t_User_Profile_userId_key" ON "t_User_Profile"("userId");

-- CreateIndex
CREATE INDEX "t_User_Profile_userId_idx" ON "t_User_Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "t_User_email_key" ON "t_User"("email");

-- AddForeignKey
ALTER TABLE "t_Post" ADD CONSTRAINT "t_Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "t_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_User_Profile" ADD CONSTRAINT "t_User_Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_Category_On_Post" ADD CONSTRAINT "t_Category_On_Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "t_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_Category_On_Post" ADD CONSTRAINT "t_Category_On_Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "t_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
