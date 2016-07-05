Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resources :users, only: [:show]
    resource :session, only: [:create, :destroy]

    resources :profiles, only: [:create, :destroy, :update, :show]

    resources :friendships, only: [:create, :update, :destroy, :index, :show] do
      resources :comments, only: [:create, :destroy]
    end

    resource :newsfeed, only: [:show]

    resources :posts, only: [:create, :update, :destroy, :index, :show] do
      resources :comments, only: [:create, :destroy]
    end

    resources :images, only: [:create, :destroy, :index] do
      resources :comments, only: [:create, :destroy]
    end
  end

  root to: "static_pages#root"
end
