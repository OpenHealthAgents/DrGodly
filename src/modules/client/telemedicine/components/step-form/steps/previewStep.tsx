"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Link,
} from "lucide-react";
import { format } from "date-fns";

import { DoctoeProfileData } from "../step-form";
import { Controller, useForm } from "react-hook-form";
import {
  DoctorConcentSchema,
  TDoctorConcent,
} from "../../schemas/doctor/doctor-register-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface PreviewStepProps {
  data: DoctoeProfileData;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function PreviewStep({ data, onPrevious, onSubmit }: PreviewStepProps) {
  const form = useForm<TDoctorConcent>({
    resolver: zodResolver(DoctorConcentSchema),
    defaultValues: {
      isAgreeToShowDetailsPublic: true,
      name: true,
      systemOfMedicine: true,
      qualification: true,
      experience: true,
      email: true,
      contactNumber: true,
      placeOfWork: true,
      profilePicture: true,
      languageSpoken: true,
      workStatus: true,
      teleConsultation: true,
      showToPublic: true,
      isDeclearedToCreateDoctorAccount: false,
    },
  });

  const [agreedToDeclaration, setAgreedToDeclaration] = useState(false);

  const { personalDetails, qualificationDetails, workDetails } = data;

  const isAgreeToShowDetailsPublic = form.watch("isAgreeToShowDetailsPublic");

  const handleSubmitProfile = (values: TDoctorConcent) => {
    const combinedData = {
      personalDetails,
      qualificationDetails,
      workDetails,
      consentDetails: values,
    };

    console.log("🩺 Doctor Profile Submission Data:", combinedData);
    console.log("✅ Personal Details:", personalDetails);
    console.log("🎓 Qualification Details:", qualificationDetails);
    console.log("💼 Work Details:", workDetails);
    console.log("🔐 Consent Form:", values);

    // Optional: You can call an API here to save data instead of just logging.
    // Example:
    // await fetch("/api/doctor/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(combinedData),
    // });

    onSubmit();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Preview & Submit
        </h2>
        <p className="text-muted-foreground">
          Review your information before submitting your profile
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="p-6 bg-gradient-card">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
            {personalDetails?.title?.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {personalDetails?.title} {personalDetails?.fullName}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {qualificationDetails?.category && (
                <Badge variant="secondary" className="gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {qualificationDetails.category}
                </Badge>
              )}
              {workDetails?.experience && (
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="w-3 h-3" />
                  {workDetails.experience}
                </Badge>
              )}
              {qualificationDetails?.systemOfMedicine && (
                <Badge variant="secondary" className="gap-1">
                  {qualificationDetails.systemOfMedicine}
                </Badge>
              )}
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
        <SectionTitle title="Personal Details" />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Detail
              label="Full Name"
              value={`${personalDetails?.title} ${personalDetails?.fullName}`}
            />
            <Detail label="Gender" value={personalDetails?.gender} />
            <Detail label="Nationality" value={personalDetails?.nationality} />
          </div>

          <Separator />

          {/* KYC Address */}
          <AddressBlock
            title="KYC Address"
            address={personalDetails?.kycAddress}
          />

          {/* Communication Address */}
          <AddressBlock
            title="Communication Address"
            address={personalDetails?.communicationAddress}
            sameAs={personalDetails?.communicationAddress?.sameAsKyc}
          />
        </div>
      </Card>

      {/* Qualification & Registration */}
      <Card className="p-6">
        <SectionTitle title="Qualifications & Registration" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail
            label="Council Name"
            value={qualificationDetails?.councilName}
          />
          <Detail
            label="Registration Number"
            value={qualificationDetails?.registrationNumber}
          />
          <Detail
            label="Registration Date"
            value={
              qualificationDetails?.dateOfFirstRegistration
                ? format(
                    qualificationDetails.dateOfFirstRegistration,
                    "dd MMM yyyy"
                  )
                : "—"
            }
          />
          <Detail
            label="Registration Type"
            value={qualificationDetails?.registrationType}
          />
          {qualificationDetails?.registrationType === "renewal" && (
            <Detail
              label="Registration Valid Until"
              value={
                qualificationDetails?.registrationValidDate
                  ? format(
                      qualificationDetails.registrationValidDate,
                      "dd MMM yyyy"
                    )
                  : "—"
              }
            />
          )}
        </div>

        <Separator className="my-4" />

        <p className="text-sm font-medium text-muted-foreground mb-3">
          Academic Qualifications
        </p>
        <div className="space-y-3">
          {qualificationDetails?.qualifications?.map((qual) => (
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
              <p className="text-xs text-muted-foreground mt-1">
                Name matches Aadhaar: {qual.nameMatchesAadhaar ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Work Details */}
      <Card className="p-6">
        <SectionTitle title="Work Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail
            label="Currently Working"
            value={workDetails?.currentlyWorking ? "Yes" : "No"}
          />
          <Detail
            label="Experience"
            value={`${workDetails?.experience} ${
              workDetails?.experience === "1" ? "year" : "years"
            }`}
          />
          {workDetails?.currentlyWorking && (
            <>
              <Detail
                label="Nature of Work"
                value={workDetails?.natureOfWork}
              />
              <Detail label="Work Status" value={workDetails?.workStatus} />
              <Detail
                label="Government Category"
                value={workDetails?.governmentCategory ?? "—"}
              />
              {workDetails?.governmentCategory === "central" && (
                <Detail
                  label="Central Government"
                  value={workDetails?.centralGovernment}
                />
              )}
              {workDetails?.teleConsultationURL && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Teleconsultation URL
                  </p>
                  <a
                    href={workDetails.teleConsultationURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm flex items-center gap-1"
                  >
                    <Link className="w-3 h-3" />{" "}
                    {workDetails.teleConsultationURL}
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Facility Details */}
        {workDetails?.workingFacilityDetails?.length ? (
          <>
            <Separator className="my-4" />
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Working Facilities
            </p>
            <div className="space-y-3">
              {workDetails.workingFacilityDetails.map((facility) => (
                <div key={facility.id} className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">
                    {facility.facilityName}{" "}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {facility.facilityStatus ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {facility.address}, {facility.district}, {facility.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {facility.department} • {facility.designation}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Type: {facility.type}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          !workDetails?.currentlyWorking && (
            <p className="text-sm text-muted-foreground mt-3">
              Not currently working — no facilities listed.
            </p>
          )
        )}

        <Separator className="my-4" />
        <p className="text-sm font-medium text-muted-foreground mb-2">About</p>
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
          {workDetails?.about}
        </p>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Concent</CardTitle>
          <CardDescription>
            Note: You provide your consent to this application to display your
            profile in public.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-0 flex-wrap">
            <div>
              <p>
                Your profile will be visible to the public, choose public
                display settings
              </p>
            </div>
            <Button size="sm" variant="link" className="text-orange-500">
              Click here
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Consent (Public Display Info) */}
      <Card>
        <CardHeader>
          <CardTitle>Public Display Information</CardTitle>
          <CardDescription>
            Choose what information you’d like to make visible to the public.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Public Display Toggle */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Controller
                name="isAgreeToShowDetailsPublic"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked as boolean)
                    }
                  />
                )}
              />
              <span className="text-sm font-medium text-foreground">
                I agree to show my details to public
              </span>
            </label>
          </div>

          {/* Mandatory Fields */}
          <div className="space-y-2">
            <p className="font-medium text-sm">Mandatory Fields</p>
            <div className="flex flex-wrap gap-4">
              {[
                "Name",
                "System of Medicine",
                "Qualification",
                "Experience",
              ].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Checkbox checked disabled />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Fields */}
          {isAgreeToShowDetailsPublic && (
            <div className="space-y-2">
              <p className="font-medium text-sm">Optional Fields</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: "email", label: "Email ID" },
                  { key: "contactNumber", label: "Contact Number" },
                  { key: "placeOfWork", label: "Place of Work" },
                  { key: "profilePicture", label: "Profile Picture" },
                  { key: "languageSpoken", label: "Language Spoken" },
                  { key: "workStatus", label: "Work Status" },
                  { key: "teleConsultation", label: "Tele Consultation" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Controller
                      name={key as keyof TDoctorConcent}
                      control={form.control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value || false}
                          onCheckedChange={(checked) =>
                            field.onChange(checked as boolean)
                          }
                        />
                      )}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* About Field */}
          {/* {isAgreeToShowDetailsPublic && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                About
              </p>
              <Controller
                name="about"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Write about your professional background (max 500 characters)"
                    className="h-32 resize-none"
                    maxLength={500}
                    {...field}
                  />
                )}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {form.watch("about")?.length || 0}/500 characters
              </p>
            </div>
          )} */}

          {/* Decline Option */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Controller
                name="showToPublic"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={!isAgreeToShowDetailsPublic}
                    onCheckedChange={(checked) => {
                      field.onChange(!checked);
                      form.setValue("isAgreeToShowDetailsPublic", !checked);
                    }}
                  />
                )}
              />
              <span className="text-sm text-foreground">
                I don’t want to show my details to public
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Declaration */}
      <Card className="p-6 border-primary/20 bg-primary/3">
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
            I hereby declare that all the details furnished above are true and
            correct to the best of my knowledge. Any false information may lead
            to disqualification or legal action.
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
          onClick={form.handleSubmit(handleSubmitProfile)}
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

/* ---------- Helper Components ---------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
      <CheckCircle2 className="w-5 h-5 text-success" />
      {title}
    </h3>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-foreground">{value || "—"}</p>
    </div>
  );
}

function AddressBlock({
  title,
  address,
  sameAs,
}: {
  title: string;
  address?: any;
  sameAs?: boolean;
}) {
  if (!address) return null;
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        {title} {sameAs && <Badge variant="outline">Same as KYC</Badge>}
      </p>
      <p className="text-foreground">
        {address?.careOf && `C/O ${address.careOf}, `}
        {address?.addressLine}, {address?.city}, {address?.district},{" "}
        {address?.state} - {address?.pincode}
      </p>
    </div>
  );
}
