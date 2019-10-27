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
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
