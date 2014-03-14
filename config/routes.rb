Wrox::Application.routes.draw do
  get 'dashboard/index'

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
end