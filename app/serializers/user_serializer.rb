class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password, :name, :location, :bio

  has_many :trips
end
