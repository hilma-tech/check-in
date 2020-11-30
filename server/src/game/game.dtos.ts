export class GameSaveReq {
  game: GameSaveDto;
  field: [
    {
      name: string;
      selection: string;
      value: [{ id: number; value: string },];
      order: number;
    },
  ];
}

export class GameSaveDto {
    game_name: string;
    image: {
      id: number;
      value: any;
    };
    description: string;
    requirements: string;
    suspended: boolean;
  
}

export class GetGameSkip {
    gamesLength: number 
}


