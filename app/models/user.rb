class User < ApplicationRecord
  has_secure_password(option={validations: false})

  validates :password, presence: { message: "Password cannot be blank." }, confirmation: { message: "Password and Confirm Password must match." }
  validates :email, presence: { message: "%{attribute} cannot be blank."}, uniqueness: { message: "%{attribute} already taken." }
  has_and_belongs_to_many :trips
end
