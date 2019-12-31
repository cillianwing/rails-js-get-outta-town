class Stop < ApplicationRecord
	include StopsHelper

	belongs_to :trip

	validates :location, :arr_date, :dep_date, presence: true
	validate :stop_start_before_end, :stop_date_confirm
end
