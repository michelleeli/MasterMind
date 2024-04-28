class GamesController < ApplicationController    
    def create
        @game = Game.new
        if @game.save
            render json: @game
        end 
    end 

    def show
        @game = Game.find(params[:id])
        if @game
            @game.set_remaining_attempts
            render json: {remaining_attempts: @game.remaining_attempts, game_over: @game.lose_game?, win_game: @game.win_game?}
        else
            render json: {error: 'not found'}
        end 
    end 

    def update
        debugger
        @game = Game.find_by(params[:id])
        if @game.set_remaining_attempts
            render json: @game
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessible_entity
        end 
    end 


end
