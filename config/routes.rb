Wrox::Application.routes.draw do
  get 'lesson/index'

  get 'dashboard/index'

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
end