class GuessesController < ApplicationController
    def create
        @guess = Guess.new(game_id: params[:game_id], attempt: params[:attempt])
        if @guess.save
            @guess.validate_guess(@guess.game.code, @guess.attempt)
            win_game = @guess.game.win_game?
            render json: {correct_location: @guess.correct_location, correct_numbers: @guess.correct_numbers, win_game: win_game}
        else
            render json: {message: 'backend error'}
        end 
    end 

    def index
        @guesses = Guess.all.sort
        render json: @guesses
    end 
end
