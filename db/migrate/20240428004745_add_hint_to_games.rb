class AddHintToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :hint, :string
  end
end
