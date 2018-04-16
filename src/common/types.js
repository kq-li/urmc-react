export type Breed = {
  breed: string,
  subbreed: ?string,
  name: string
};

export type Dog = {
  breed: Breed
};
