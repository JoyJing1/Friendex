class Api::PostsController < ApplicationController

	def create
    @post = Post.new(post_params)

    if @post.save
      render "api/posts/show"
    else
      render json: @post.errors, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])

    if @post.update_attributes(post_params)
      render "api/posts/show"
    else
      render json: @post.errors, status: 422
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def index
    receiver_id = params[:receiver_id]
    author_id = params[:author_id]
    @posts = Post.where("receiver_id = ? OR author_id =  ?", receiver_id, author_id)
                  .order(created_at: :desc)
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render "api/posts/show"
    else
      render {}
    end
  end

	private

	def post_params
		params.require(:post).permit(:author_id, :receiver_id, :body)
	end

end
