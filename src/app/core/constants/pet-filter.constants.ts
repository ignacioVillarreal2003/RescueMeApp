export const SexValues = ['MALE', 'FEMALE', 'UNKNOWN'] as const;
export type Sex = typeof SexValues[number];

export const StateValues = ['AVAILABLE', 'ADOPTED', 'IN_TREATMENT', 'LOST'] as const;
export type State = typeof StateValues[number];

export const SpeciesValues = ['DOG', 'CAT', 'RABBIT', 'BIRD', 'HAMSTER', 'TURTLE', 'FISH', 'LIZARD', 'HORSE', 'PIG', 'GOAT', 'CHICKEN', 'DUCK', 'FROG', 'OTHER'] as const;
export type Species = typeof SpeciesValues[number];

export const SizeValues = ['TOY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT', 'UNKNOWN'] as const;
export type Size = typeof SizeValues[number];
