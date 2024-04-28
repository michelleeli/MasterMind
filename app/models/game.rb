require 'open-uri'

class Game < ApplicationRecord
    validates :remaining_attempts, presence: true
    validates :code, presence: true

    before_validation :set_code
    has_many :guesses
  
    def set_code
        self.code ||= generate_code
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
            if res[:correct_location] == self.code.length and res[:correct_numbers] == self.code.length
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

    def set_mode(mode)
        self.mode = mode
        self.save!
    end 

    private    

    # def generate_code 
    #     level = self.mode
    #     res = URI.open("https://www.random.org/integers/?num=#{level}&min=1&max=6&col=1&base=10&format=plain&rnd=new").read
    #     code = res.split("\n").join()
    #     return code
    # end 

    def generate_code
        level = self.mode
        if level == 1
            return "1234"
        elsif level == 2
            return "12345"
        elsif level == 3
            return "234567"
        end 
    end 

end
