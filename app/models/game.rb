require 'open-uri'

class Game < ApplicationRecord
    validates :remaining_attempts, presence: true
    validates :code, presence: true

    before_validation :set_code
    has_many :guesses
  
    def set_code
        self.code ||= "1234"
    end
    
    def set_remaining_attempts
        self.remaining_attempts = 10 - self.guesses.count()
        self.save!
    end

    def lose_game?
        if self.remaining_attempts == 0 
            return true
        else
            return false
        end 
    end 

    def win_game?
        self.guesses.each do |guess|
            res = guess.validate_guess(self.code, guess.attempt)
            if res[:correct_location] == 4 and res[:correct_numbers] == 4
                return true
            end 
        end 
        return false
    end 

    def set_hint 
        total = 0
        self.code.each_char do |num|
            total += num.to_i
        end 
        self.hint ||= "The sum of the numbers is #{total}"
        self.save!
    end 

    private    

    def generate_code 
        res = URI.open('https://www.random.org/integers/?num=4&min=1&max=6&col=1&base=10&format=plain&rnd=new').read
        code = res.split("\n").join()
        return code
    end 

end
