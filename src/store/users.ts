export type User = {
    id: number
    email: string
    name: string
    passwordHash: string
}

export type PublicUser = {
    id: number
    email: string
    name: string
}

export type CreateUserInput = {
    email: string
    name: string
    passwordHash: string
}

export class Users {
    private users: User[] = []
    private nextId = 1

    toPublicUser(user: User): PublicUser {
        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }

    listUsers(): PublicUser[] {
        return this.users.map(user => this.toPublicUser(user))
    }

    findUserById(id: number): User | null {
        return this.users.find(user => user.id === id) ?? null
    }

    findUserByEmail(email: string): User | null {
        return this.users.find(user => user.email === email.toLowerCase()) ?? null
    }

    createUser({ email, name, passwordHash }: CreateUserInput): PublicUser {
        const user: User = {
            id: this.nextId++,
            email: email.toLowerCase().trim(),
            name: name.trim(),
            passwordHash
        }

        this.users.push(user)
        return this.toPublicUser(user)
    }
}

export const usersStore = new Users()


