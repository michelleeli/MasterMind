class Guess < ApplicationRecord
  belongs_to :game

  validates :attempt, presence: true

  def validate_guess(code, attempt)
      correct_numbers = 0
      correct_location = 0
      attempt_array = attempt.split('').map(&:to_i)
      code_array1 = code.split('').map(&:to_i)
      code_array2 = code.split('').map(&:to_i)
      attempt_array.each_with_index do |num, index|
          if code_array1.include?(num)
            correct_numbers += 1
            code_array1[code_array1.index(num)] = nil
          end 
          if code_array2[index] == num
            correct_location += 1
            code_array2[index] = nil
          end
      end
      self.correct_numbers = correct_numbers
      self.correct_location = correct_location
      self.save!
  end

end


