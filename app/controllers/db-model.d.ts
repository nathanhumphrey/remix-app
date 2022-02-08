interface DBModel {
  properties: object;
  create(): void;
  read(): DBModel;
  update(): void;
  delete(): void;
}

export { DBModel };
