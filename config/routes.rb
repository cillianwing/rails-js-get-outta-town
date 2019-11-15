Rails.application.routes.draw do
  
  resources :users do
    resources :trips
  end

  resources :trips do
    resources :stops
    resources :flights
    resources :activities
    resources :accommodations
    resources :reviews
  end

  root 'home#index'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  get '/group_trip', to: 'trips#group_trip'
  post '/group_trip', to: 'trips#join_group'

  get '/users/:id/all_stops', to: 'stops#all_stops', as: 'all_stops'
  get '/users/:id/all_flights', to: 'flights#all_flights', as: 'all_flights'
  get '/users/:id/all_activities', to: 'activities#all_activities', as: 'all_activities'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
