Wrox::Application.routes.draw do
  get 'lesson/index'

  get 'dashboard/index'

  get '/landing' => 'dashboard#landing'
  get '/inter1' => 'dashboard#inter1'
  get '/inter2' => 'dashboard#inter2'
  get '/inter3' => 'dashboard#inter3'
  get '/inter4' => 'dashboard#inter4'

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
end