import { RoomMemberDto } from "../../../../dtos/room-member.dto";
import "./room-member.style.scss";

export interface RoomPlayerProps {
    member: RoomMemberDto;
}

function RoomMember({ member }: Readonly<RoomPlayerProps>) {
    return (
        <div>
            Player {member.playerId} state {member.state}
        </div>
    );
}

export default RoomMember;
