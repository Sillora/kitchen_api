import { mysqlTable, mysqlEnum, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";


export const USER_ROLES = [ "user", "admin", ] as const;


export const POST_STATUS = [ "delete", "published", ] as const;

export const postsTable = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Pastikan string "user_id" sama persis dengan nama kolom di DB
  userId: int("user_id").notNull(), 
  
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  
  imageUrl: varchar("image_url", { length: 500 }),
  imagePublicId: varchar("image_public_id", { length: 200 }),
  
  // Tambahkan ini agar sinkron dengan ALTER TABLE tadi
  status: mysqlEnum("status", ["delete", "published"]).default("published"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});


// USERS
export const usersTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role",USER_ROLES).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  imageUrl: varchar("image_url", { length: 500 }),
  imagePublicId: varchar("image_public_id", { length: 200 }),
});
