

export interface IMedia {
    Name: string;
    Type: string;
    Year: string;
    Age: number;
    Genres: string[];
    Actors: string[];
    Director: string;
    Description: string;
    Length: string;
    Cover: string;
    Files: IFiles[];
}

export interface IFiles {
    Name: string;
    File: string;
}