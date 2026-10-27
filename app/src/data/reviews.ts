// Opinie z profilu Google. Lista jest celowo pusta — nie wolno wymyślać opinii.
// TODO: wklej prawdziwe opinie z profilu Google (autor, ocena 1–5, treść, data).

export type Review = { author: string; rating: 1 | 2 | 3 | 4 | 5; text: string; date: string }

export const reviews: Review[] = []
