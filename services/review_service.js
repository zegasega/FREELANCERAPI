const BaseService = require("../core/base_service");

class ReviewService extends BaseService{
    constructor(){
        super(db.Review); 
        this.db = this.db;
        
    }

    async createReview(reviewData) {

        const { jobId, freelancerId, reviewerId, rating, comment } = reviewData;
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5.");
        }

        const job = await db.Job.findByPk(jobId);
        if (!job) {
            throw new Error("Job not found.");
        }

        const freelancer = await db.User.findByPk(freelancerId);
        if (!freelancer) {
            throw new Error("Freelancer user not found.");
        }

        const reviewer = await db.User.findByPk(reviewerId);
        if (!reviewer) {
            throw new Error("Reviewer user not found.");
        }

        if (job.clientId !== reviewerId) {
            throw new Error("Reviewer must be the client who owns the job.");
        }


        if (job.freelancerId !== freelancerId) {
            throw new Error("Freelancer is not assigned to this job.");
        }

        const existingReview = await this.findOne({
            where: { jobId, freelancerId, reviewerId },
        });
        if (existingReview) {
            throw new Error("You have already reviewed this freelancer for this job.");
        }

        const review = await this.create({
            jobId,
            freelancerId,
            reviewerId,
            rating,
            comment
        });

        return {
            message: "Review created successfully.",
            data: review,
        };
    }
}
