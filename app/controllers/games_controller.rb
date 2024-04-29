class GamesController < ApplicationController    
    def create
        @game = Game.new
        mode = params[:mode].to_i
        @game.set_mode(mode)
        if @game.save
            @game.set_hint
            render json: @game
        else 
            render json: {message: 'backend error'}
        end 
    end 

    def show
        @game = Game.find(params[:id])
        if @game
            @game.set_remaining_attempts
            render json: {remaining_attempts: @game.remaining_attempts, game_over: @game.lose_game?, win_game: @game.win_game?, hint: @game.hint}
        else
            render json: {error: 'not found'}
        end 
    end 

end
