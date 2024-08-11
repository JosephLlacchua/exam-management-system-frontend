export class User {
  username: string;
  password: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  roles: string[];

  constructor(username: string, password: string, name: string, lastname: string, email: string, phone: string, roles: string[]) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.roles = roles;
  }
}

