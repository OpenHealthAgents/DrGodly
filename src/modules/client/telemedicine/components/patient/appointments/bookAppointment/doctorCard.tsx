import {
  CheckCircle2,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Doctor } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DoctorCard = ({
  doctor,
  selected,
  onSelect,
  onViewReviews,
}: {
  doctor: Doctor;
  selected: boolean;
  onSelect: () => void;
  onViewReviews: () => void;
}) => {
  return (
    <Card
      onClick={onSelect}
      className={`relative p-5 cursor-pointer group ${
        selected
          ? "border-primary bg-primary/10"
          : "hover:border-primary/20 hover:bg-primary/5"
      }`}
    >
      {selected && (
        <div className="bg-primary text-secondary p-1 rounded-full absolute right-5">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border"
          />
          {/* {doctor.available && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
          )} */}
        </div>

        {/* Content */}
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-muted-foreground font-medium text-sm">
                {doctor.subSpecialty || doctor.specialty}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{doctor.rating}</span>
              <span className="text-muted-foreground">
                ({doctor.reviews.length} reviews)
              </span>
            </div>

            <Button
              size="sm"
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
                onViewReviews();
              }}
              className="text-xs font-medium text-muted-foreground underline decoration-muted-foreground hover:text-orange-400 hover:decoration-orange-400 transition-colors flex items-center gap-1 !p-0 h-fit"
            >
              <MessageSquare className="w-3 h-3" />
              View Reviews
            </Button>
          </div>

          <div className="grid gap-1 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {doctor.location}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              {doctor.phone}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {doctor.description}
          </p>

          <div className="pt-3">
            <Badge className="inline-flex py-1 px-2 items-center rounded-full font-medium bg-green-50 text-green-600 border border-green-600 dark:border-green-900 dark:text-white dark:bg-green-900">
              <ShieldCheck className="mr-1" />
              Licensed Professional
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">Click to select</p>
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onViewReviews();
          }}
        >
          <MessageSquare /> View Reviews
        </Button>
      </div>
    </Card>
  );
};
