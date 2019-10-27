Rails.application.routes.draw do
  resources :accommodations
  resources :activities
  resources :reviews
  resources :stops
  resources :flights
  resources :trips
  resources :users

  root 'home#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
