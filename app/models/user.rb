class User < ApplicationRecord
  has_secure_password

  validates :password, presence: true
  validates :email, presence: true, uniqueness: { message: "%{attribute} already taken." }
  has_and_belongs_to_many :trips
end
