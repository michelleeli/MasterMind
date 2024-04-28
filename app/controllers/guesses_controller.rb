class GuessesController < ApplicationController
    def create
        @guess = Guess.new(game_id: params[:game_id], attempt: params[:attempt])
        if @guess.save
            result = @guess.validate_guess(@guess.game.code, @guess.attempt)
            win_game = @guess.game.win_game?
            render json: {correct_location: result[:correct_location], correct_numbers: result[:correct_numbers], win_game: win_game}
        else
            render json: {message: 'backend error'}
        end 
    end 

    def index
        @guesses = Guess.all
        render json: @guesses
    end 

    def show
        @guess = Guess.find_by(params[:id])
        render @guess
    end 

    def guess_params
        params.permit(:attempt, :game_id)
    end
end
