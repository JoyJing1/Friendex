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

    if receiver_id || author_id
      posts = Post.where("receiver_id = ? OR author_id =  ?", receiver_id, author_id)
      posts.each { |item| item.type = "post" }


      images = Image.where("receiver_id = ? OR author_id =  ?", receiver_id, author_id)
      images.each { |item| item.type = "image" }

      @posts = posts.concat(images).sort do |e1, e2|
            e2.updated_at <=> e1.updated_at
          end

      render "api/posts/index"
    else
      render json: { errors: "no data yet" }
    end
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
