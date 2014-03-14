class ApplicationController < ActionController::Base
  include Pundit
  before_filter :weeks,:days
  def weeks
    @weeks=["Module 1","Module 2","Module 3","Module 4", "Module 5","Module 6"]
  end
  def days
    @days=[
      "Using Functions and Packages in R",
      "Descriptive Statistics in R",
      "Analyzing Big Data by Using Functions, Loops, and Data Frames",
      "Graphical Analysis in R", 
      "Hypothesis Testing in R"
    ]
  end  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "Access denied."
    redirect_to (request.referrer || root_path)
  end
  def after_sign_in_path_for(resource)
     dashboard_index_path
  end
end
