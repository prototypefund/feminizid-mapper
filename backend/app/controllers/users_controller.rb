# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_verify_user, only: %i[update destroy]

  def me
    render json: current_user
  end

  def update
    @user.update!(user_params)
    JWTSessions::Session.new(namespace: "user_#{@user.id}").flush_namespaced_access_tokens
    render json: @user
  end

  def destroy
    @user.destroy
  end

  private

  def set_verify_user
    if current_user.id == params[:id]
      @user = User.find(params[:id])
    else
      forbidden
    end
  end

  def user_params
    params.require(:user).permit(:email,
                                 :password,
                                 :password_confirmation)
  end
end
