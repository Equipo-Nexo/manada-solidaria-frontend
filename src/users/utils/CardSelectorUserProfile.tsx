import { mapAnimalPostToCardProps } from "@/common/components/animalPostCard/mapAnimalPostToCardProps"
import type { ProfilePost } from "../app/api/responses/GetSpecificUserProfileResponse"
import AnimalPostSummaryCard from "../components/animalPostSummaryCard/AnimalPostSummaryCard"
import CampaignSummaryCard from "../components/campaignSummaryCard/CampaignSummaryCard"
import FundraisingSummaryCard from "../components/fundraisingSummaryCard/FundraisingSummaryCard"
import { useNavigate } from "react-router-dom"

function CardSelector({ post }: { post: ProfilePost }) {

    const navigate = useNavigate();

    switch (post.postType) {

        case 'animal':
            return <AnimalPostSummaryCard
                key={post.id}
                {...mapAnimalPostToCardProps({
                    ...post,
                    imageUrl: post.imageId,
                })}
                onViewMore={() => navigate(`/animal/detalle/${post.id}`)}
            />

        case 'campaign':
            return <CampaignSummaryCard
                key={post.id}
                campaign={post}
                onViewMore={() => navigate(`/campanias/${post.id}`)}
            />

        case 'fundraising':
            return <FundraisingSummaryCard
                key={post.id}
                fundraising={post}
                onViewMore={() => navigate(`/colectas/${post.id}`)}
            />
    }
}
export default CardSelector;
