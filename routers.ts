import { Router }from 'https://deno.land/x/oak/mod.ts';
import { getGames, getGame, addGame, updateGame, deleteGame } from './controller.ts'

const router = new Router()
router
.get('/games', getGames)
.get('/games/:id', getGame)
.post('/games', addGame)
.put('/games/:id', updateGame)
.delete('/games/:id', deleteGame)


export default router