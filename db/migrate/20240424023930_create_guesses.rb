class CreateGuesses < ActiveRecord::Migration[7.0]
  def change
    create_table :guesses do |t|
      t.string :attempt, null: false
      t.references :game, foreign_key: {to_table: :games}, null: false

      t.timestamps
    end
  end
end
