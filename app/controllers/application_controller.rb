class ApplicationController < ActionController::Base
  include Pundit
  before_filter :weeks,:days,:chapters,:topics
  def weeks
    @weeks=["Week 1","Week 2","Week 3","Week 4", "Week 5","Week 6"]
  end
  def days
    @days=["Session 1","Session 2","Session 3","Session 4", "Session 5"]
  end  
  def chapters
    @chapters=["Week 1","Week 2","Week 3","Week 4", "Week 5","Week 6"]
  end
  def topics
    @topics1=["Introduction to Big Data","Business Applications of Big Data",
        "Technologies for Handling Big Data","Understanding the Hadoop Ecosystem","MapReduce Fundamentals"]
    @topics2=    
        ["Understanding Analytics","Analytical Approaches and Tools","Exploring R",
          "Reading Data Sets into R, Exporting Data from R","Manipulating and Processing Data"]
    @topics3=      
        ["Session 1","Session 2","Session 3","Session 4", "Session 5"]
    @topics4=    
        ["Session 1","Session 2","Session 3","Session 4", "Session 5"]
    @topics5=
        ["Session 1","Session 2","Session 3","Session 4", "Session 5"]  
    @topics6=["Session 1","Session 2","Session 3","Session 4", "Session 5"]  
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

