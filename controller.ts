interface IGame {
    id: number;
    name: string;
    hits: number;
}

let games: Array<IGame> = [
    {
        id: 0,
        name: 'Maplestory',
        hits: 1523
    },
    {
        id: 1,
        name: 'Yulgang',
        hits: 15231
    },
    {
        id: 2,
        name: 'RO',
        hits: 152325456
    },
];

const getGames = ({ response }: { response: any }) => { 
    response.body = games 
}

const searchGameByID = (id: string): ( IGame | undefined ) => games.find((game) => game.id === Number(id));

const getGame = ({ params, response }: { params: { id: string }; response: any }) => {
    const game: IGame | undefined = searchGameByID(params.id)
    if (game) {
      response.status = 200
      response.body = game
    } else {
      response.status = 404
      response.body = { message: `Game not found.` }
    }   
}

const addGame = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body()
    const game: IGame = body.value  
    games.push(game)
    response.body = { message: 'OK' }
    response.status = 200
}

const updateGame = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
    let game: IGame | undefined = searchGameByID(params.id)
    if (game) {
      const body = await request.body()
      const updateInfos: { name?: string; hits?: number } = body.value
      game = { ...game, ...updateInfos}
      games = [...games.filter(obj => obj.id !== Number(params.id)), game]
      response.status = 200
      response.body = { message: 'OK' }
    } else {
      response.status = 404
      response.body = { message: `Game not found` }
    }  
}

const deleteGame = ({ params, response }: { params: { id: string }; response: any }) => {
    let game: IGame | undefined = searchGameByID(params.id)
    if (game) {
        games = games.filter(game => game.id !== Number(params.id))
        response.body = { message: 'OK' }
        response.status = 200
    } else {
        response.status = 404
        response.body = { message: `Game not found` }
    }
}

export { getGames, getGame, addGame, updateGame, deleteGame }