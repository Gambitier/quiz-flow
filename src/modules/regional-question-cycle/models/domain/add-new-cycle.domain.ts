export class AddNewCycleDomainModel {
  id?: string;
  regionId: string;
  cycleStart: Date;
  cycleEnd: Date;

  constructor(partial: Partial<AddNewCycleDomainModel>) {
    Object.assign(this, partial);
  }
}
