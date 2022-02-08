class User {
  constructor(private username: string, private id?: string) {
    this.username = username;
    this.id = id || '';
  }
  getUsername(): string {
    return this.username;
  }
  setUsername(username: string): void {
    this.username = username;
  }
  getId(): string {
    return this.username;
  }
  setId(id: string): void {
    this.id = id;
  }
}
