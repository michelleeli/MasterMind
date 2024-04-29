class Guess < ApplicationRecord
  belongs_to :game

  validates :attempt, presence: true

  def validate_guess(code, attempt)
      correct_numbers = 0
      correct_location = 0
      attempt_array = attempt.split('').map(&:to_i)
      code_array = code.split('').map(&:to_i)
      attempt_array.each_with_index do |num, index|
        if code_array.include?(num)
          correct_numbers += 1
          if code_array[index] == num
            correct_location += 1
            code_array[index] = nil
          end
        end
      end
      self.correct_numbers = correct_numbers
      self.correct_location = correct_location
      self.save!
  end

end


