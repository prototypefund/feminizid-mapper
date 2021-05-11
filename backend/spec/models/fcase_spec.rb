# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fcase, type: :model do
  it 'is valid with ident' do
    fcase = described_class.new(
      ident: '2021-12-21-foobar'
    )
    expect(fcase).to be_valid
  end

  it 'is invalid without ident' do
    fcase = described_class.new
    fcase.valid?
    expect(fcase.errors[:ident]).to include("can't be blank")
  end

  it 'has many victims' do
    c = described_class.reflect_on_association(:victims)
    expect(c.macro).to eq(:has_many)
  end

  it 'has many perpetrators' do
    c = described_class.reflect_on_association(:perpetrators)
    expect(c.macro).to eq(:has_many)
  end
end
