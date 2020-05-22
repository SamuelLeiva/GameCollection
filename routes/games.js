const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()

//Game Model
const Game = require('../models/Game')

// @route Get /games
// @des Get games
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id })
    res.json(games)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})

// @route POST /games
// @des Add new game
// @access Private
router.post('/',
  [
    auth,
    [
      check('name', 'Please provide the name').not().isEmpty(),
      check('note', 'Please provide the note').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, note, console, isOwned } = req.body

    try {
      const newGame = new Game({
        user: req.user.id,
        name,
        note,
        console,
        isOwned
      })
      const game = await newGame.save()

      res.json(game)

    } catch (err) {

      console.error(err.message)
      res.status(500).send('server error')
    }
  })



// @route PUT /games/:id
// @des update game
// @access Private


router.put('/:id', auth, async (req, res) => {
  const { name, note, console, isOwned } = req.body

  // build Game object 
  const gameFields = { name, note, console, isOwned };

  try {
    let game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ msg: 'Game not found' })
    // Make sure user owns the game
    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    game = await Game.findByIdAndUpdate(req.params.id, { $set: gameFields }, { new: true })
    res.send(game)
  } catch (err) {
    console.errors(err.message)
    res.status(500).send('Server Error')
  }
})

// @route DELETE /games/:id
// @des Delete a game
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ msg: 'Game not found' })
    // check if user owns the game 
    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    await Game.findByIdAndRemove(req.params.id)
    res.send('Game Removed successfully')
  } catch (err) {
    console.errors(err.message).json('Server Error')
  }
})

module.exports = router