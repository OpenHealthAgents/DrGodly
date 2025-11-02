import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DoctoeProfileData } from "../step-form";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { format } from "date-fns";

interface PreviewStepProps {
  data: DoctoeProfileData;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function PreviewStep({ data, onPrevious, onSubmit }: PreviewStepProps) {
  const [agreedToDeclaration, setAgreedToDeclaration] = useState(false);

  const { personalDetails, qualificationDetails, workDetails } = data;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Preview & Submit
        </h2>
        <p className="text-muted-foreground">
          Review your information before submitting your profile
        </p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 bg-gradient-card">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            {personalDetails?.title} {personalDetails?.fullName?.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {personalDetails?.title} {personalDetails?.fullName}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="gap-1">
                <GraduationCap className="w-3 h-3" />
                {qualificationDetails?.category}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Briefcase className="w-3 h-3" />
                {workDetails?.experience}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                {qualificationDetails?.systemOfMedicine}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {personalDetails?.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                {personalDetails?.mobileNumber}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Languages className="w-4 h-4" />
                {personalDetails?.languagesSpoken?.join(", ")}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {personalDetails?.dateOfBirth &&
                  format(personalDetails.dateOfBirth, "dd MMM yyyy")}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          Personal Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Full Name
              </p>
              <p className="text-foreground">
                {personalDetails?.title} {personalDetails?.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gender
              </p>
              <p className="text-foreground capitalize">
                {personalDetails?.gender}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Father&apos;s Name
              </p>
              <p className="text-foreground">{personalDetails?.fatherName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Nationality
              </p>
              <p className="text-foreground">{personalDetails?.nationality}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              KYC Address
            </p>
            <p className="text-foreground">
              {personalDetails?.kycAddress?.careOf &&
                `C/O ${personalDetails.kycAddress.careOf}, `}
              {personalDetails?.kycAddress?.addressLine},{" "}
              {personalDetails?.kycAddress?.city},{" "}
              {personalDetails?.kycAddress?.district},{" "}
              {personalDetails?.kycAddress?.state} -{" "}
              {personalDetails?.kycAddress?.pincode}
            </p>
          </div>
        </div>
      </Card>

      {/* Qualifications & Registration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          Qualifications & Registration
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Council
              </p>
              <p className="text-foreground">
                {qualificationDetails?.councilName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Registration Number
              </p>
              <p className="text-foreground">
                {qualificationDetails?.registrationNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Registration Date
              </p>
              <p className="text-foreground">
                {qualificationDetails?.dateOfFirstRegistration &&
                  format(
                    qualificationDetails.dateOfFirstRegistration,
                    "dd MMM yyyy"
                  )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Registration Type
              </p>
              <p className="text-foreground capitalize">
                {qualificationDetails?.registrationType}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Academic Qualifications
            </p>
            <div className="space-y-3">
              {qualificationDetails?.qualifications?.map((qual, index) => (
                <div key={qual.id} className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">
                    {qual.degreeName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {qual.college}, {qual.university}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {qual.state}, {qual.country} • {qual.passingMonth}{" "}
                    {qual.passingYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Work Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          Work Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Currently Working
              </p>
              <p className="text-foreground">
                {workDetails?.currentlyWorking ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Experience
              </p>
              <p className="text-foreground">{workDetails?.experience}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Work Status
              </p>
              <p className="text-foreground capitalize">
                {workDetails?.workStatus?.replace(/-/g, " ")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Consultation Types
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {workDetails?.consultationTypes?.map((type) => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type.replace(/-/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {workDetails?.placeOfWork && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Place of Work
                  </p>
                  <p className="text-foreground">{workDetails.placeOfWork}</p>
                </div>
                {workDetails.clinicName && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Clinic Name
                    </p>
                    <p className="text-foreground">{workDetails.clinicName}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              About
            </p>
            <p className="text-foreground text-sm leading-relaxed">
              {workDetails?.about}
            </p>
          </div>
        </div>
      </Card>

      {/* Declaration */}
      <Card className="p-6 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3">
          <Checkbox
            id="declaration"
            checked={agreedToDeclaration}
            onCheckedChange={(checked) =>
              setAgreedToDeclaration(checked as boolean)
            }
            className="mt-1"
          />
          <label
            htmlFor="declaration"
            className="text-sm text-foreground leading-relaxed cursor-pointer"
          >
            I hereby declare that I am voluntarily sharing the above-mentioned
            particulars and information. I certify that the above information
            furnished by me is true, complete, and correct to the best of my
            knowledge. I understand that in the event of my information being
            found false or incorrect at any stage, I shall be held liable for
            the same.
          </label>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={!agreedToDeclaration}
          className="gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Submit Profile
        </Button>
      </div>
    </div>
  );
}
