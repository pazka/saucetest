import type { NewUserDTO, SecureUser } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<SecureUser[] | null>> {
    try {
      const users = await this.userRepository.findAllAsync();
      if (!users || users.length === 0) {
        return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<SecureUser[]>("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: number): Promise<ServiceResponse<SecureUser | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<SecureUser>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createNewUser(user: NewUserDTO): Promise<ServiceResponse<SecureUser | null>> {
    try {
      if (await await this.userRepository.findByEmail(user.email)) {
        return ServiceResponse.failure("User with email already exists", null, StatusCodes.BAD_REQUEST);
      }

      const newUser = await this.userRepository.createNewUser(user);
      if (!newUser) {
        return ServiceResponse.failure("User not created", null, StatusCodes.BAD_REQUEST);
      }
      return ServiceResponse.success<SecureUser>("User created", newUser);
    } catch (ex) {
      const errorMessage = `Error creating user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string): Promise<ServiceResponse<SecureUser | null>> {
    try {
      const user = await this.userRepository.validate(email, password);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<SecureUser>("Login successful", user);
    } catch (ex) {
      const errorMessage = `Error validating user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while validating user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}



export const userService = new UserService();
