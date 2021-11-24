export class Team{
  constructor(
    public _id: String,
    public tournament: String,
    public name: String,
    public picture: String,
    public gamePlayed: number,
    public wins: number,
    public draws: number,
    public loses: number,
    public goalsFor: number,
    public goalsAgainst: number,
    public goalsDiference: number,
    public points: number
  ){}
}
