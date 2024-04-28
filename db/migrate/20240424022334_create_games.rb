class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :remaining_attempts, default: 10, null:false
      t.string :code, null:false
      t.timestamps
    end
  end
end
