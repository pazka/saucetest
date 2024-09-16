import { NewUserDTO, SecureUserSchema, type SecureUser, type User } from "@/api/user/userModel";

export const users: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: 2,
    name: "Robert",
    email: "Robert@example.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  }
];

export class UserRepository {
  async findAllAsync(): Promise<SecureUser[]> {
    return users.map((user) => {
      return SecureUserSchema.parse(user);
    });
  }

  async findByIdAsync(id: number): Promise<SecureUser | null> {
    const user = users.find((user) => user.id === id) 
    return user ? SecureUserSchema.parse(user) : null;
  }
  
  async findByEmail(email: string): Promise<SecureUser | null> {
    const user = users.find((user) => user.email === email);
    return user ? SecureUserSchema.parse(user) : null;
  }

  async createNewUser(user: NewUserDTO): Promise<SecureUser | null> {    
    console.log(user);
    const newUser = {
      ...user,
      id: users.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(newUser);
    
    users.push(newUser);
    return SecureUserSchema.parse(newUser);
  }

  async validate(email: string, password: string): Promise<SecureUser | null> {
    console.log(email,password);
    const user = users.find((user) => user.email === email && user.password === password);
    
    return user ? SecureUserSchema.parse(user) : null;
  }
}
