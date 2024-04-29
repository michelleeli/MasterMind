class AddCorrectToGuesses < ActiveRecord::Migration[7.0]
  def change
    add_column :guesses, :correct_location, :integer
    add_column :guesses, :correct_numbers, :integer
  end
end
